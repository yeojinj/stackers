package com.ssafy.stackers.model.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;

@Getter
public class MainStationDto {
    private String content;
    private List<String> tags;
    private VideoDto videoDto;
}
