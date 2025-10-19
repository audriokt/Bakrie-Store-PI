package com.audrio.backendbakrie.utils;

import org.springframework.web.multipart.MultipartFile;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FileUploadUtils {
    public static final long MAX_FILE_SIZE = 2*1024*1024;
    public static final String IMAGE_PATTERN = "([^\\s]+(\\.(?i)(jpg|png|gif|bmp))$)";
    public static final String DATE_FORMAT = "yyyyMMddHHmmss";
    public static final String FILE_NAME_FORMAT = "%s_%s";

    public static boolean isAllowedExtension(final String fileName, final String pattern){
        final Matcher matcher = Pattern.compile(pattern).matcher(fileName);
        return matcher.matches();
    }

    public static void assertAllowedExtention(MultipartFile file, final String pattern){
        final String fileName = file.getOriginalFilename();
        if(!isAllowedExtension(fileName, pattern)){

            throw new ExceptionUtils(ExceptionUtils.INVALID_EXTENSION);
        }

        final long fileSize = file.getSize();
        if(file.getSize() > MAX_FILE_SIZE){
            throw new ExceptionUtils(ExceptionUtils.IMG_SIZE_TO_BIG);
        }
    }

    public static String getFileName(final String name){
        final DateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
        final String date = dateFormat.format(System.currentTimeMillis());
        return String.format(FILE_NAME_FORMAT, name, date);
    }
}
