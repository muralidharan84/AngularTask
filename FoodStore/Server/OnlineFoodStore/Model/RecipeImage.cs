using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFoodStore.Model
{
    [Table("RecipeImage")]
    public class RecipeImage
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public string Url { get; set; }

        public Recipe RecipeId { get; set; }
        // Navigation Property
        [ForeignKey("RecipeId")]
        public Recipe Recipe { get; set; }
    }
}
