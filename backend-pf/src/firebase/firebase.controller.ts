import { Controller, Get, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Firebase Storage')
@Controller('firebase')
export class FirebaseController {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post('recibos')
  @ApiOperation({ summary: 'Subir un archivo a Firebase Storage' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.firebaseService.uploadFile(file);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener la lista de archivos en un directorio con paginación' })
  @ApiQuery({ name: 'folderPath', required: true, description: 'Ruta de la carpeta en Firebase Storage' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de archivos por página', example: '10' })
  @ApiQuery({ name: 'pageToken', required: false, description: 'Token de la página para paginación' })
  async getReceipts(
    @Query('folderPath') folderPath: string,
    @Query('limit') limit: string,
    @Query('pageToken') pageToken: string,
  ) {
    const limitNumber = Number(limit) || 10;
    return this.firebaseService.getReceipts(folderPath, limitNumber, pageToken);
  }

  @Get('download')
  @ApiOperation({ summary: 'Descargar un archivo de Firebase Storage' })
  @ApiQuery({ name: 'filePath', required: true, description: 'Ruta completa del archivo en Firebase Storage' })
  async downloadFile(
    @Query('filePath') filePath: string,
  ) {
    return this.firebaseService.getDownloadUrl(filePath);
  }
}
