import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  // app.useStaticAssets(join(__dirname, ''));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  const config = new DocumentBuilder()
    .setTitle('Tour pillow api')
    .setDescription('The tour API description')
    .setVersion('1.0')
    .addTag('tour')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3002);
  // await app.listen(3002, '0.0.0.0');
}
bootstrap();
// mongodb://abidh:abid1080@<hostname>/?ssl=true&replicaSet=atlas-7mqem7-shard-0&authSource=admin&retryWrites=true&w=majority
//mongoDB compass url:mongodb://abidh:abid1080@cluster0-shard-00-00.yjjjj.mongodb.net:27017,cluster0-shard-00-01.yjjjj.mongodb.net:27017,cluster0-shard-00-02.yjjjj.mongodb.net:27017/test?replicaSet=atlas-7mqem7-shard-0&ssl=true&authSource=admin
