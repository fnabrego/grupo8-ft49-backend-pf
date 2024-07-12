import { Injectable, NotFoundException } from '@nestjs/common';
import { getDownloadURL, getStorage, list, ref, uploadBytes } from 'firebase/storage';

@Injectable()
export class FirebaseService {
  async uploadFile(file): Promise<string> {
    const storage = getStorage()
    // try {
    //   await uploadBytes(storageRef, file.buffer);
    //   console.log('Archivo subido a la nube');
    //   return 'Archivo subido exitosamente';
    // } catch (error: any) {
    //   throw new Error(error);
    // }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');

    const filePath = `Recibos/${year}/${month}/${file.originalname}`;
    const storageRef = ref(storage, filePath);

    try {
      await uploadBytes(storageRef, file.buffer);
      console.log('File uploaded to the cloud');
      return 'File uploaded successfully';
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getReceipts(folderPath: string, limit: number, pageToken?: string) {
    const storage = getStorage()
    const listRef = ref(storage, folderPath);
    const options: any = { maxResults: limit };

    if (pageToken) {
      options.pageToken = pageToken;
    }

    const result = await list(listRef, options);
    const items = result.items.map(item => item.fullPath);

    return {
      items,
      nextPageToken: result.nextPageToken,
    };
  }

  async getDownloadUrl(filePath: string):Promise<string> {
    const storage = getStorage()
    const fileRef = ref(storage, filePath);
    const downloadUrl = await getDownloadURL(fileRef);
    if (!downloadUrl) {
      throw new NotFoundException('No se ha encontrado un archivo en esa direccion')
    }
    return downloadUrl;
  }
}
