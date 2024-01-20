import { GqlException } from "../../lib/ExceptionHandler";
import { gqIsOrg } from "../../middlewares/Auth.Middleware";
import { RecipeController } from "../../modules/admin/recipe";

export default {

    Query: {

        list: async (_: any, args: any, context: any) => {
            
            const session = await gqIsOrg(context.headers);

            return RecipeController.list(args?.params, session)
            .catch(err => {
                throw new GqlException(err);
            });
        },
        recipe: async (_:any, args: any, context: any) => {

            const session = await gqIsOrg(context.headers);

            return RecipeController.detail(args, session)
            .catch(err => {
                throw new GqlException(err);
            });
        }
    },

    Mutation: {

        createRecipe: async (_: any, args: any, context: any) => {

            const session = await gqIsOrg(context.headers);

            return await RecipeController.add(args.data, session)
                .catch(err => {
                throw new GqlException(err);
                });
        },
        updateRecipe: async (_: any, args: any, context: any) => {

            const session = await gqIsOrg(context.headers);
            
            return RecipeController.update(args.params, session)
            .catch(err => {
                throw new GqlException(err);
            });
        },
        deleteRecipe: async (_: any, args: any, context: any) => {

            const session = await gqIsOrg(context.headers);

            return RecipeController.remove(args, session)
            .catch(err => {
                throw new GqlException(err);
            });
        },
    },
}