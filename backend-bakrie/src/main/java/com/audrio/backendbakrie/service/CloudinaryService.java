package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.CloudinaryResponse;
import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {
    CloudinaryResponse uploadFile(MultipartFile file, String fileName);
    boolean deleteFile(String imgUrl);
}
