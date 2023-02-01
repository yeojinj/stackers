package com.ssafy.stackers.service;

import com.ssafy.stackers.model.Tag;
import com.ssafy.stackers.repository.TagRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@Transactional(readOnly = true)
public class TagService {
    @Autowired
    private TagRepository tagRepository;
    @Transactional
    public void save(List<String> tags){
        for(int i = 0; i < tags.size(); i++){
            Tag newTag = Tag.builder().name(tags.get(i)).build();
            tagRepository.save(newTag);
        }
    }
}
