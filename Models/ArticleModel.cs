using System.ComponentModel.DataAnnotations.Schema;

namespace boxon_project.Models
{
    public class ArticleModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ArticleId { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Language { get; set; }

    }
}
