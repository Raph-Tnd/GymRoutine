using System;
using System.Collections.Generic;

namespace back.Model;

public partial class User
{
    public string Id { get; set; } = null!;

    public string Usertype { get; set; } = null!;

    public virtual ICollection<Program> Programs { get; set; } = new List<Program>();
}
