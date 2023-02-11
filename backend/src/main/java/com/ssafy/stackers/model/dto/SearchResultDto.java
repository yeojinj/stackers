package com.ssafy.stackers.model.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class SearchResultDto {
    private List<MainStationDto> stationList;
    private List<SearchMemberDto> memberList;

    public SearchResultDto(List<MainStationDto> stationList, List<SearchMemberDto> memberList) {
        this.stationList = stationList;
        this.memberList = memberList;
    }
}
