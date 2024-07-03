import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('firebase')
export class FirebaseController {
    constructor (
        private readonly firebaseService: FirebaseService
    ){}

    @Post('recibos')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.firebaseService.uploadFile(file);
    }
}
