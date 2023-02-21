import { Res, HttpStatus, Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, ParseIntPipe } from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { TourDocument } from './entities/tour.entity';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('Tour')
@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) { }

  @Post()
  create(@Body() createTourDto: CreateTourDto) {
    return this.tourService.create(createTourDto);
  }

 
  @Get()
  findAll() {
    return this.tourService.findAll();
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourDto: any) {
    return this.tourService.update(id, updateTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourService.remove(+id);
  }


  @Delete('/remove-image/:id/:imageId')
  removeImage(@Param('id') id: string, @Param('imageId') imageId: string) {
    try {
      let data = this.tourService.removeImage({ id: id, imageId: imageId });;

      if (data) {
        return { status: true, data }
      } else {
        return { status: false, message: 'No Record Found' }

      }
    } catch (error) {
      return { status: false, message: error.message }
    }
  }

  // import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

  @ApiExtraModels(CreateTourDto) // for CatDto to be found by getSchemaPath()
  @ApiResponse({
    schema: {
      '$ref': getSchemaPath(CreateTourDto)
    }
  })


  @Get('/all-tours')
  async find(@Res() res: Response, @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    let resp = await this.tourService.find(page, limit);
    if (resp) {
      res.status(HttpStatus.OK).json(resp);
    } else {
      res.status(HttpStatus.NO_CONTENT).json({message:'Please check your Limits, No record Found'});

    }
  }
  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    try {
      let data = await this.tourService.findOne(slug);
      if (data) {
        return { status: true, data }
      } else {
        return { status: false, message: 'No Record Found with this slug' }
      }
    } catch (error) {
      return { status: false, message: error.message }
    }
  }
  @Patch('/update-image/:id')
  updateImage(@Param('id') id: string, @Body() updateImageBody: any) {
    return this.tourService.updateImage({ id: id, body: updateImageBody });

    // try {
    // let data = this.tourService.updateImage({ id: id, body: updateImageBody });;

    //   if (data) {
    //     return { status: true, data }
    //   } else {
    //     return { status: false, message: 'No Record Found' }

    //   }
    // } catch (error) {
    //   return { status: false, message: error.message }
    // }
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        const randomName = Date.now()
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))

  uploadFile(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    console.log(body)
    console.log(file)
    if (body.type == 'THUMBNAIL') {

      return this.tourService.uploadThumbnail({ id: body.id, fileName: file.filename });
    } else {
      let fileObj = { url: file.filename, status: true, order: body.order, type: body.type }
      return this.tourService.uploadImage({ id: body.id, fileObj: fileObj });
    }
  }

}

