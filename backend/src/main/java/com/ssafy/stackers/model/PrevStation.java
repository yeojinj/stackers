package com.ssafy.stackers.model;

import com.ssafy.stackers.model.Station;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PrevStation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @MapsId
//    @OneToOne
//    @JoinColumn(name = "id")
//    private Station station;

    @Column(name = "prev_station_id")
    private Long prevStationId;

//    @Builder
//    public PrevStation(Station station, Long prevStationId) {
//        this.station = station;
//        this.prevStationId = prevStationId;
//    }
}
