import { Injectable } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tour, TourDocument } from './entities/tour.entity';
import { Body } from '@nestjs/common/decorators';
@Injectable()
export class TourService {
  constructor(@InjectModel(Tour.name) private collectionModel: Model<TourDocument>) { }


  create(createTourDto: CreateTourDto) {
    const createdCollection = new this.collectionModel(createTourDto);
    return createdCollection.save();
  }
  findAll() {
    return this.collectionModel.find();
  }

  findOne(slug: string) {
    return this.collectionModel.findOne({ slug: slug });
  }

  //upload image
  async uploadImage(obj: any) {
    let item = await this.collectionModel.findById(obj.id)
    item.images.push({ ...obj.fileObj })
    return item.save()
  }
  //upload image
  async uploadThumbnail(obj: any) {
    let item = await this.collectionModel.findById(obj.id)
    item.thumbnailImage = obj.fileName;
    return item.save()
  }

  //remove image
  async removeImage(obj: any) {
    await this.collectionModel.updateOne({ _id: obj.id }, {
      "$pull": {
        "images": { _id: obj.imageId },
      },
    });
    return this.collectionModel.findById(obj.id)

  }

  //update image
  async updateImage(obj: any) {

    let makeObj: any = {};
    let imageId: any = obj.body.imageId;
    let body: any = obj.body;
    delete body.imageId;
    Object.keys(body).map((bodyItem: any) => {
      let s = ("images.$." + bodyItem + "").toString();
      makeObj = {
        ...makeObj, [s]: body[bodyItem]
      }
    })

    await this.collectionModel.updateOne({
      _id: obj.id,
      "images": { $elemMatch: { _id: imageId } }
    }, {
      "$set": {
        ...makeObj
      }
    });
    return this.collectionModel.findById(obj.id)

  }

  async update(id: string, updateTourDto: any) {
    try {
      await this.collectionModel.updateOne({ _id: id }, {
        ...updateTourDto
      });
      return this.collectionModel.findById(id)
    } catch (error) {
      return error;

    }
  }

  async find(page: number, limit: number): Promise<any> {
    try {
      let skip = (page - 1) * limit;
      let count = await this.collectionModel.find().count().exec();
      // last_record
      if (count > skip) {
        let res = await this.collectionModel.find()
          .sort({ _id: 1 })
          .skip(skip)
          .limit(limit)
          .exec();
        return { data: res, current: skip + limit, range: `${skip + 1}-${(skip + limit) > count ? count : (skip + limit)}`, total_records: count }
      } else {
        return false
      }
    } catch (error) {
      return false
    }

  }

  remove(id: number) {
    return `This action removes a #${id} tour`;
  }
}
