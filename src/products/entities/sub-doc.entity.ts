// src/products/entities/sub-doc.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SubDoc {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const SubDocSchema = SchemaFactory.createForClass(SubDoc);
