package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Tag;
import com.ssafy.stackers.repository.TagRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    @Transactional
    public List<Tag> save(List<String> tags) {
        // 태그 정보 반환 리스트 생성
        List<Tag> tagList = new ArrayList<>();
        Tag newTag = null;

        for (int i = 0; i < tags.size(); i++) {
            if(!tagRepository.existsByName(tags.get(i))){
                //	태그가 없으면 -> DB 저장 -> List에 Tag 추가
                newTag = Tag.builder().name(tags.get(i)).build();
                tagRepository.save(newTag);
            } else{
                newTag = tagRepository.findByName(tags.get(i)).orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
            }
            tagList.add(newTag);
        }

        return tagList;
    }

    public Tag findById(Long id) {
        Tag tag = tagRepository.findById(id)
            .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        return tag;
    }
}
