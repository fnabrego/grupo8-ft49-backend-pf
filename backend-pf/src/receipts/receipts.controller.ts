import { Controller, HttpCode, Param, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { ReceiptsService } from './receipts.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../roles/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Receipts')
@Controller('receipts')
export class ReceiptsController {
    constructor(
        private readonly firebaseService: FirebaseService,
        private readonly receiptService: ReceiptsService
    ) { }

    @HttpCode(201)
    @Post('update/:id')
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
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        const link = await this.firebaseService.uploadFile(file);
        return this.receiptService.updateReceipt(id, link);
    }

    // @Get('download')
    // @ApiOperation({ summary: 'Descargar un archivo de Firebase Storage' })
    // @ApiQuery({ name: 'filePath', required: true, description: 'Ruta completa del archivo en Firebase Storage' })
    // async downloadFile(
    //   @Query('filePath') filePath: string,
    // ) {
    //   return this.firebaseService.getDownloadUrl(filePath);
    // }



}
