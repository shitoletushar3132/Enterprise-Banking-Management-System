import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { EntityStatus } from '../../common/enums/entity-status.enum';

@Schema({ timestamps: true })
export abstract class BaseDocument {
  @Prop({ type: String, enum: EntityStatus, default: EntityStatus.ACTIVE, index: true })
  status!: EntityStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  createdBy?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  updatedBy?: Types.ObjectId;

  @Prop({ type: Date, default: null, index: true })
  deletedAt?: Date | null;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  deletedBy?: Types.ObjectId;

  createdAt!: Date;
  updatedAt!: Date;
}
