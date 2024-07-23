namespace back.Model
{
    public class ExerciseModel
    {
        public string Name { get; set; }
        public int Sets { get; set; }
        public int RepsPerSet { get; set; }
        public double Weight { get; set; }
        public string WeightUnit { get; set; }
        public int PauseTime { get; set; }
        public List<MetricModel> Metrics { get; set; }
    }
}
