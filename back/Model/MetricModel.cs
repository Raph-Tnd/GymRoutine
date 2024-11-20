using System.Text.Json.Serialization;

namespace back.Model
{
    public class MetricModel
    {
        [JsonPropertyName("name")]

        public string Name { get; set; }
        [JsonPropertyName("value")]

        public int? Value { get; set; }
    }
}
