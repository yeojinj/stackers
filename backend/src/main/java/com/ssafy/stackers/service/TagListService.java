package com.ssafy.stackers.service;

import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.model.Tag;
import com.ssafy.stackers.model.TagList;
import com.ssafy.stackers.repository.TagListRepository;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class TagListService {

    @Autowired
    private TagListRepository tagListRepository;

    @Transactional
    public void save(List<Tag> tags, Station station) {
        for (int i = 0, size = tags.size(); i < size; i++) {
            TagList tagList = TagList.builder().tag(tags.get(i)).station(station).build();
            tagListRepository.save(tagList);
        }
    }

    @Transactional
    public List<TagList> findByStation(Station station){
        return tagListRepository.findByStation(station);
    }
}
