import mongoose from "mongoose";
import { gqIsOrg } from "../../middlewares/Auth.Middleware";
import { CouponController, CouponManager } from "../../modules/admin/coupon";
import { GqlException } from "../../lib/ExceptionHandler";

export default {

  Query: {

    coupons: async (_: any, args: any, context: any) => {

      const session = await gqIsOrg(context.headers);
      
      return CouponController.list(args?.params, session)
      .catch(err => {
        throw new GqlException(err);
      });
    },

    coupon: async (_: any, params: { id: mongoose.Types.ObjectId }) => {
      return CouponManager.detail({_id: params.id})
      .catch(err => {
        throw new GqlException(err);
      });
    },

  },
  Mutation: {
    
    createCoupon: async (_: any, args: any, context: any) => {
        const session = await gqIsOrg(context.headers);
      return await CouponController.add(args.coupon, session)
        .catch(err => {
          throw new GqlException(err);
        });
    },
    updateCoupon: async (_: any, args: any, context: any) => {
      const session = await gqIsOrg(context.headers);
      return CouponController.update(args.coupon, session)
      .catch(err => {
        throw new GqlException(err);
      });
    },
    deleteCoupon: async (_: any, params: { id: mongoose.Types.ObjectId }, context: any) => {
      const session = await gqIsOrg(context.headers);

      return CouponController.remove(params, session)
      .catch(err => {
        throw new GqlException(err);
      });
    },
  },
};