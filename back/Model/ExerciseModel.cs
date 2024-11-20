using System.Text.Json.Serialization;

namespace back.Model
{
    public class ExerciseModel
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("sets")]

        public int Sets { get; set; }
        [JsonPropertyName("repsPerset")]

        public int RepsPerSet { get; set; }
        [JsonPropertyName("weight")]

        public double Weight { get; set; }
        [JsonPropertyName("weightUnit")]

        public string WeightUnit { get; set; }
        [JsonPropertyName("pauseTime")]

        public int PauseTime { get; set; }
        [JsonPropertyName("metrics")]

        public List<MetricModel> Metrics { get; set; }
    }
}
