import express, { Application, Errback, Request, Response, NextFunction } from "express";
import { ApolloServer, ApolloError, UserInputError } from "apollo-server-express";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import "./lib/Database";
import "./models";
import * as ModuleRoute from "./modules";
import { CONSTANT } from "./config";
import path from "path";

export default class Bootstrap {

    static init() {

        const port = process.env.PORT ?? 3003;

        const app: Application = express();

        app.use(express.json());

        /**
         * Init Middlewares
         */
        Bootstrap.initMiddlewares(app);

        /**
         * Init Routes
         */
        Bootstrap.initRoutes(app);
            
        app.use((error: any, req: Request, res: Response, next: NextFunction) => {

          console.info("-----------App Error Handler-----------");

          if (error) {
            console.error(error.stack);

            res
                .status(error.statusCode || CONSTANT.HTTP_CODE.ERROR)
                .json({
                    statusCode: error.statusCode || CONSTANT.HTTP_CODE.ERROR,
                    message: error.message,
                });
          }
          else {
            res.status(CONSTANT.HTTP_CODE.SERVER_ERROR).json({
                statusCode: CONSTANT.HTTP_CODE.SERVER_ERROR,
                message: CONSTANT.MESSAGES.ERROR.SERVER_ERROR,
            });
          }
      });

      this.initGraphql(app)
        .then(() => {

            app.listen(port, () => {
                console.log(`Application is running on port ${port}.`);
            });
        });
    }

    static initRoutes(app: Application) {

        console.info("Initialising Routes ...")

        app.use("/admin", ModuleRoute.AdminRoute);
        app.use("/admin/category", ModuleRoute.CategoryRoute);
        app.use("/admin/characteristic", ModuleRoute.CharacteristicsRoute);
        app.use("/admin/tax", ModuleRoute.TaxRoute);
        app.use("/admin/transaction", ModuleRoute.TransactionRoute);
        app.use("/admin/product", ModuleRoute.ProductRoute);
        app.use("/admin/organisation", ModuleRoute.OrganisationRoute);
        app.use("/admin/raw", ModuleRoute.RawRoute);
        app.use("/admin/extra", ModuleRoute.ExtraRoute);
        app.use("/admin/setting", ModuleRoute.SettingRoute);
        
        app.use("/auth", ModuleRoute.UserRoute);
    }

    static initMiddlewares(app: Application) {

        console.info("Initialising Middlewares ...");

        app.use("/", (req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("device-id", "dummy")
            /* console.info(`
            ---------------------------------------------------\n
            Req Headers : ${JSON.stringify(req.headers)} \n
            Req Query : ${JSON.stringify(req.query)} \n
            Req Body : ${JSON.stringify("req.body")} \n
            ---------------------------------------------------\n
            `); */

            next();
        });
    }

    static async initGraphql(app: Application) {

        // Load schema files
        const schemaFolder = path.join(__dirname, 'graphql/schema');
        const typesArray = loadFilesSync(`${schemaFolder}/**/*.graphql`);
        const typeDefs = mergeTypeDefs(typesArray);

        // Load resolver files
        const resolversArray = loadFilesSync(path.join(__dirname, 'graphql/resolvers'));
        const resolvers = mergeResolvers(resolversArray);
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: ({ req }) => {
                return { headers: req.headers };
            },
            formatError: (error: any) => {

                // Custom error formatting logic
                const { message, extensions, path: errorPath } = error;
                const statusCode = extensions?.statusCode || CONSTANT.HTTP_CODE.ERROR; // Custom error code or default
                const formattedError = {
                  message,
                  statusCode,
                  path: errorPath ? errorPath.join('.') : null,
                };
                return formattedError;
              },
         });

        await server.start();

        server.applyMiddleware({ app });

        return true;
    }
}