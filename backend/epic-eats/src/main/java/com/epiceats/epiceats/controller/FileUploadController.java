package com.epiceats.epiceats.controller;

import com.epiceats.epiceats.utils.Result;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/upload")
public class FileUploadController {

    @Autowired
    private S3Client s3Client;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Value("${aws.s3.region}")
    private String region;

    @PostMapping()
    public Result<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String fileName = file.getOriginalFilename();
        Path tempFile = null;
        try {
            // Store file into the temp directory
            // use tempFile can make sure the file can be uploaded in a concrete way.
            // "java.io.tmpdir" is a system property, which store the temp directory
            tempFile = Files.createTempFile(Paths.get(System.getProperty("java.io.tmpdir")), null, null);
            // transfer the file to tempFile
            file.transferTo(tempFile.toFile());

            // Upload file to S3
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();

            PutObjectResponse response = s3Client.putObject(putObjectRequest, tempFile);

            // delete temp file
            Files.deleteIfExists(tempFile);

            // Get S3 URL
            String fileUrl = "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + fileName;

            return Result.success(fileUrl);
        } catch (IOException e) {
            if (tempFile != null) {
                try {
                    Files.deleteIfExists(tempFile);
                } catch (IOException ioException) {
                    // Ignore
                }
            }
            return Result.error("File upload failed: " + e.getMessage());
        }
    }
}
