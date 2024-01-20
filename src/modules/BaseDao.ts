import mongoose from "mongoose";
import constants from "../config/constants";

export default class BaseDao {

    private MODEL: any;

    constructor(model: mongoose.Model<any>) {
        this.MODEL = model
    }

    /**
     * Get detail
     * @param query 
     * @param projection 
     * @returns 
     */
    async detail(query: any, projection: any = {}) {
        return this.MODEL.findOne(query, projection);
    }
    
    /**
     * Get list
     * @param query 
     * @param projection 
     * @returns 
     */
    async list(
        query: any = {},
        projection: any = {},
        limit = constants.QUERY.LIMIT,
        skip = 0,
        sort = constants.QUERY.SORT_BY,
        sortOrder = -1
    ) {
        return this.MODEL.find(query, projection, {
            limit,
            skip,
            sort: { [sort]: sortOrder },
        });
    }

    async paginateData(pipeline: any, options: any) {
        const page: number = parseInt(options?.pageNo as string) || 1;
        const pageSize: number = parseInt(options?.limit as string) || 10;

        const pipelineQuery: any = [
            {
                $facet: {
                    paginatedResults: [
                        ...pipeline,
                        { $skip: (page - 1) * pageSize },
                        { $limit: pageSize },
                    ],
                    totalCount: [
                        ...pipeline,
                        {
                            $count: 'count',
                        },
                    ],
                },
            },
            {
                $unwind: {
                    path: '$totalCount',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    data: '$paginatedResults',
                    totalItems: {
                    $ifNull: ['$totalCount.count', 0],
                    },
                },
            },
        ];

        const paginatedData = await this.MODEL.aggregate(pipelineQuery);

        return {
            data: paginatedData[0]?.data || [],
            totalItems: paginatedData[0]?.totalItems || 0,
            totalPages: Math.ceil(paginatedData[0]?.totalItems / pageSize) || 1,
            currentPage: page,
        };
      };

    /**
     * Update 
     * @param query 
     * @param data 
     * @returns 
     */
    async update(query: any, data: any) {
        return this.MODEL.updateOne(query, data);
    }

    /**
     * Remove
     * @param query 
     * @returns 
     */
    async remove(query: any) {
        return this.MODEL.updateOne({ status: constants.MODEL_STATUS.DELETED });
    }

    /**
     * Delete
     * @param query 
     * @returns 
     */
    async delete(query: any) {
        return this.MODEL.deleteOne(query);
    }

    /**
     * Save
     * @param data 
     * @returns 
     */
    async add(data: any) {
        return this.MODEL.create(data);
    }

    /**
     * Aggregate
     */
    async aggregate(pipeline: any[]) {
        return this.MODEL.aggregate(pipeline);
    }
}