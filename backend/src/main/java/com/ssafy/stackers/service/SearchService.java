package com.ssafy.stackers.service;

import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.model.dto.MainStationDto;
import com.ssafy.stackers.model.dto.SearchMemberDto;
import com.ssafy.stackers.model.dto.SearchResultDto;
import com.ssafy.stackers.repository.StationRepository;
import com.sun.tools.javac.Main;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class SearchService {
    @Autowired
    private StationRepository stationRepository;
    @Autowired
    private TagService tagService;
    @Autowired
    private TagListService tagListService;

    public SearchResultDto searchStation(String keyword){
        // station을 음악으로 검색
        List<Station> stations = stationRepository.findByMusicContaining(keyword);
        List<MainStationDto> stationList = new ArrayList<>();

        for(int i = 0; i < stations.size(); i++){
            Station s = stations.get(i);
            List<String> tags = tagService.findNameById(tagListService.findByStation(s));
            stationList.add(new MainStationDto(s.getId(), s.getContent(), tags, s.getVideo()));
        }

        // member를 username, nickname으로 검색

        List<SearchMemberDto> memberList = new ArrayList<>();


        // 검색 결과 반환
        SearchResultDto searchResultDto = new SearchResultDto(stationList, memberList);
        return searchResultDto;
    }

}
