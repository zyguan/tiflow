package debug

import "github.com/prometheus/client_golang/prometheus"

var (
	InspectFlowBlockingDuration = prometheus.NewHistogramVec(
		prometheus.HistogramOpts{
			Namespace: "ticdc",
			Subsystem: "inspect",
			Name:      "flow_blocking_duration_seconds",
			Buckets:   prometheus.ExponentialBuckets(0.01, 2, 18),
		}, []string{"changefeed", "table"})
	InspectDuration = prometheus.NewHistogramVec(
		prometheus.HistogramOpts{
			Namespace: "ticdc",
			Subsystem: "inspect",
			Name:      "duration_seconds",
			Buckets:   prometheus.ExponentialBuckets(0.01, 2, 18),
		}, []string{"changefeed", "table", "type"})
	InspectChanSize = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Namespace: "ticdc",
			Subsystem: "inspect",
			Name:      "chan_size",
		}, []string{"changefeed", "table", "type"})
)

func InitMetrics(registry *prometheus.Registry) {
	registry.MustRegister(InspectFlowBlockingDuration)
	registry.MustRegister(InspectDuration)
	registry.MustRegister(InspectChanSize)
}
