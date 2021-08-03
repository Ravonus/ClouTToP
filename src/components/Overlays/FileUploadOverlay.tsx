import React, { FC } from 'react';
import path from 'path';
import { remote } from 'electron';

const { app } = remote;
const dir = app.getAppPath();

interface FileUploadOverlayProps {}

export const FileUploadOverlay: FC<FileUploadOverlayProps> = () => {
  console.log(__dirname);
  return (
    <>
      <div className='w-screen h-screen bg-gray-800 absolute top-0 left-0 flex flex-wrap content-center'>
        <div
          style={{
            left: '56%',
            top: '25%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          }}
          className='relative'
        >
          <img
            className='opacity-100'
            style={{ width: 128, height: 128 }}
            src={`${path.join(
              dir,
              '../',
              'cloutPlugins/ARPaper/src',
              'assets/icons/',
              'iconmonstr-upload-10.svg'
            )}`}
          />
          <span>Create Image Library Item</span>
        </div>
      </div>
      <div className='w-screen h-screen bg-gray-800 opacity-50 absolute top-0 left-0 z-30' />
    </>
  );
};
