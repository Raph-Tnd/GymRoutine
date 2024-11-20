using System.Text.Json.Serialization;

namespace back.Model
{
    public class SessionModel
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("exercises")]
        public List<ExerciseModel> Exercises { get; set; }
    }
}
