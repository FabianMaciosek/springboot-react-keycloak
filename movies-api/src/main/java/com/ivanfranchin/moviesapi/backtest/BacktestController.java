package com.ivanfranchin.moviesapi.backtest;

import com.ivanfranchin.moviesapi.backtest.dto.BacktestDto;
import com.ivanfranchin.moviesapi.backtest.dto.TradeStatisticsDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.time.Instant;

@RestController
@RequestMapping("/api/backtests")
public class BacktestController {

    @GetMapping("/{strategyId}")
    public BacktestDto backtest(@PathVariable String strategyId) {
        // Completely mocked – strategyId is ignored on purpose
        TradeStatisticsDto ts = new TradeStatisticsDto(
                Instant.parse("2024-10-24T09:00:00Z"),
                Instant.parse("2025-01-09T16:15:00Z"),
                34, 22, 12,
                "33.36", "90.43", "-57.07",
                "18.47", "-19.18",
                "0.9812", "4.1105", "-4.7558",
                Duration.parse("PT14H26M1.7647059S"),
                Duration.parse("PT9H27M57.2727274S"),
                Duration.parse("PT23H32M30S"),
                Duration.parse("PT10H30M"),
                Duration.parse("PT8H45M"),
                Duration.parse("PT23H45M"),
                6, 3,
                "0.8643", "1.8333",
                "0.6471", "0.3529",
                "-6.5379", "25456841.2982",
                "-29.40", "57702239.88",
                "-39.52", "-57702243.56",
                "6.4850", "5.7255",
                "1.5845", "0.1513", "0.1714",
                "0.8441", "-57702239.40",
                "-25456840.3171",
                Duration.parse("P24DT23H45M"), "0"
        );
        return new BacktestDto(ts);
    }
}
