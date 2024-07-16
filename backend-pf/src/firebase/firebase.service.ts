import { Injectable, NotFoundException } from '@nestjs/common';
import { getDownloadURL, getStorage, list, ref, uploadBytes } from 'firebase/storage';

@Injectable()
export class FirebaseService {

  async uploadFile(fileBuffer: Buffer, fileName: string): Promise<string> {
    const storage = getStorage()
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const filePath = `Recibos/${year}/${month}/${fileName}`;
    const storageRef = ref(storage, filePath);

    try {
      await uploadBytes(storageRef, fileBuffer);
      console.log('File uploaded to the cloud');
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
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

  async getDownloadUrl(filePath: string): Promise<string> {
    const storage = getStorage()
    const fileRef = ref(storage, filePath);
    const downloadUrl = await getDownloadURL(fileRef);
    if (!downloadUrl) {
      throw new NotFoundException('No se ha encontrado un archivo en esa direccion')
    }
    return downloadUrl;
  }
}
