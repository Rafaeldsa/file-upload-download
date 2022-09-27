package com.example.fileupload.exampleFileUpload.repository;

import com.example.fileupload.exampleFileUpload.model.FileDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FileDBRepository extends JpaRepository<FileDB, String> {
    FileDB save(FileDB filedb);

    Optional<FileDB> findById(String id);

    List<FileDB> findAll();
}
