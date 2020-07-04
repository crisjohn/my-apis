import { Module } from '@nestjs/common';
import { McController } from './mc.controller';
import { McService } from './mc.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MCUsersSchema } from './mc.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'mc_users', schema: MCUsersSchema }]),
  ],
  controllers: [McController],
  providers: [McService],
})
export class McModule {}
