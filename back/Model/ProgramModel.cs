using System.Text.Json.Serialization;

namespace back.Model
{
    public class ProgramModel
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("author")]
        public string Author { get; set; }
        [JsonPropertyName("sessions")]
        public List<SessionModel> Sessions { get; set; }
    }
}
