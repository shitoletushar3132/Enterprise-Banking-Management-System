import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { EntityStatus } from '../../common/enums/entity-status.enum';
import { BaseDocument } from './base.schema';

export abstract class BaseRepository<T extends BaseDocument> {
  protected constructor(protected readonly model: Model<T>) {}

  async create(payload: Partial<T>): Promise<T> {
    const document = new this.model(payload);
    return document.save();
  }

  async findById(id: string | Types.ObjectId, includeDeleted = false): Promise<T | null> {
    const filter: FilterQuery<T> = { _id: id };
    if (!includeDeleted) {
      Object.assign(filter, { deletedAt: null });
    }
    return this.model.findOne(filter).exec();
  }

  async findOne(filter: FilterQuery<T>, includeDeleted = false): Promise<T | null> {
    const query: FilterQuery<T> = { ...filter };
    if (!includeDeleted) {
      Object.assign(query, { deletedAt: null });
    }
    return this.model.findOne(query).exec();
  }

  async findMany(
    filter: FilterQuery<T>,
    options: {
      skip?: number;
      limit?: number;
      sort?: Record<string, 1 | -1>;
      includeDeleted?: boolean;
    } = {},
  ): Promise<T[]> {
    const query: FilterQuery<T> = { ...filter };
    if (!options.includeDeleted) {
      Object.assign(query, { deletedAt: null });
    }

    let cursor = this.model.find(query);
    if (options.sort) {
      cursor = cursor.sort(options.sort);
    }
    if (typeof options.skip === 'number') {
      cursor = cursor.skip(options.skip);
    }
    if (typeof options.limit === 'number') {
      cursor = cursor.limit(options.limit);
    }
    return cursor.exec();
  }

  async count(filter: FilterQuery<T>, includeDeleted = false): Promise<number> {
    const query: FilterQuery<T> = { ...filter };
    if (!includeDeleted) {
      Object.assign(query, { deletedAt: null });
    }
    return this.model.countDocuments(query).exec();
  }

  async updateById(id: string | Types.ObjectId, update: UpdateQuery<T>): Promise<T | null> {
    return this.model
      .findOneAndUpdate({ _id: id, deletedAt: null }, update, {
        new: true,
      })
      .exec();
  }

  async softDelete(
    id: string | Types.ObjectId,
    deletedBy?: Types.ObjectId | string,
  ): Promise<T | null> {
    return this.model
      .findOneAndUpdate(
        { _id: id, deletedAt: null },
        {
          $set: {
            deletedAt: new Date(),
            deletedBy: deletedBy ? new Types.ObjectId(String(deletedBy)) : undefined,
            status: EntityStatus.INACTIVE,
          },
        },
        { new: true },
      )
      .exec();
  }
}
