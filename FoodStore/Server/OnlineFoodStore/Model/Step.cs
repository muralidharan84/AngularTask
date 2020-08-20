using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineFoodStore.Model
{
    [Table("Step")]
    public class Step
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public Recipe RecipeId { get; set; }
        // Navigation Property
        [ForeignKey("RecipeId")]
        public Recipe Recipe { get; set; }

    }
}