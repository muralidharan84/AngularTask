using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFoodStore.Model
{
    public class Recipe
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public List<Step> Steps { get; set; }

        public string level { get; set; }
        public DateTime CreatedDate { get; set; }

        public List<RecipeImage> Images { get; set; }

    }
}
