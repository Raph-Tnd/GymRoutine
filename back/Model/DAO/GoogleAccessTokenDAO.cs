using System.Text.Json.Serialization;

namespace back.Model.DAO
{
    public class GoogleAccessTokenDAO
    {
        [JsonPropertyName("azp")]
        public string AuthorizedParty { get; set; }

        [JsonPropertyName("aud")]
        public string Audience { get; set; }

        [JsonPropertyName("sub")]
        public string Subject { get; set; }

        [JsonPropertyName("scope")]
        public string Scope { get; set; }

        [JsonPropertyName("exp")]
        public string ExpirationTime { get; set; }

        [JsonPropertyName("expires_in")]
        public string ExpiresIn { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("email_verified")]
        public string EmailVerified { get; set; }

        // Helper method to check if the token is expired
        public bool IsExpired()
        {
            if (long.TryParse(ExpirationTime, out long expirationTimestamp))
            {
                var expirationDate = DateTimeOffset.FromUnixTimeSeconds(expirationTimestamp);
                return expirationDate <= DateTimeOffset.UtcNow;
            }
            return false;
        }

        // Helper method to get expiration as DateTime
        public DateTime? GetExpirationDateTime()
        {
            if (long.TryParse(ExpirationTime, out long expirationTimestamp))
            {
                return DateTimeOffset.FromUnixTimeSeconds(expirationTimestamp).DateTime;
            }
            return null;
        }
    }
}
