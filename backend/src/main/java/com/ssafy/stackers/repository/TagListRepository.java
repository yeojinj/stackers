package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.model.TagList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagListRepository extends JpaRepository<TagList, Long> {
    List<TagList> findByStation(Station station);
}
