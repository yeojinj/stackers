package com.ssafy.stackers.controller;

import com.ssafy.stackers.model.dto.SearchResultDto;
import com.ssafy.stackers.service.SearchService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "Search", description = "검색 관련 API")
@RestController
@RequestMapping("api/search")
public class SearchController {
    @Autowired
    private SearchService searchService;

    @GetMapping("/{keyword}")
    public SearchResultDto search(@PathVariable("keyword") String keyword){
        return searchService.searchStation(keyword);
    }
}
