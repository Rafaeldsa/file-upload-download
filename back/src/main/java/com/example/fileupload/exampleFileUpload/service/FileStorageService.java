package com.example.fileupload.exampleFileUpload.service;

import java.io.IOException;
import java.util.Optional;
import java.util.stream.Stream;

import com.example.fileupload.exampleFileUpload.model.FileDB;
import com.example.fileupload.exampleFileUpload.repository.FileDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;



@Service
public class FileStorageService {

    @Autowired
    private FileDBRepository fileDBRepository;

    public FileDB store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        FileDB FileDB = new FileDB(fileName, file.getContentType(), file.getBytes());

        return fileDBRepository.save(FileDB);
    }

    public FileDB getFile(String id) {
        Optional<FileDB> fileOptional = fileDBRepository.findById(id);
        return fileOptional.get();
    }

    public Stream<FileDB> getAllFiles() {
        return fileDBRepository.findAll().stream();
    }
}
