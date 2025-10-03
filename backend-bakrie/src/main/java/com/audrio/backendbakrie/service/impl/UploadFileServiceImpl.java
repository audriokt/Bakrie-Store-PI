package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.io.CloudinaryResponse;
import com.audrio.backendbakrie.service.CloudinaryService;
import com.audrio.backendbakrie.utils.ExceptionUtils;
import com.cloudinary.Cloudinary;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UploadFileServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;

    @Transactional
    @Override
    public CloudinaryResponse uploadFile(MultipartFile file, String fileName) {
        try{
            final Map result = this.cloudinary.uploader().upload(file.getBytes(), Map.of("public_id","bakrie/"+fileName));
            final String String_url = (String) result.get("secure_url");
            final String publicId = (String) result.get("public_id");
            return CloudinaryResponse.builder()
                    .url(String_url)
                    .publicId(publicId)
                    .build();
        } catch (IOException e){
            throw new ExceptionUtils(ExceptionUtils.FAILED_TO_UPLOAD_IMG + e.getMessage());
        }
    }

    @Override
    public boolean deleteFile(String imgUrl) {
        return false;
    }
}
