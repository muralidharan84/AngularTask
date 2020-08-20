using Microsoft.EntityFrameworkCore;
using OnlineFoodStore.Model;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFoodStore.Repository
{
    public static class ModelBuilderExtensions
    {
       
        public static void Seed(this ModelBuilder modelBuilder)
        {
            var title = new[] { "Briyani", "Rice", "Indian Rice", "Chapati", "Veg Briyani", "Doosa", "Idly", "Poori", "Masala Doosa", "Ghee Roast", "Parota", "Panneer Masala", "Sambar", "Pulau Rice", "Coffee" };

            var level = new[] { "Hard", "Easy", "Moderate" };

            var urls = new[] { "/asserts/recipe/1.jpg", "/asserts/recipe/2.jpg", "/asserts/recipe/3.jpg", "/asserts/recipe/4.jpg", "/asserts/recipe/5.jpg", "/asserts/recipe/6.jpg", "/asserts/recipe/7.jpg", "/asserts/recipe/8.jpg", "/asserts/recipe/9.jpg" };

            List<Ingredient> lingredient = new List<Ingredient>();
            List<RecipeImage> images = new List<RecipeImage>();


           
           //// modelBuilder.Entity<Step>().HasData(lsteps);

           // for (int i = 1; i < 5; i++)
           // {
           //     lingredient.Add(new Ingredient()
           //     {
           //         Id = i,
           //         Quantity = quantity[new Random().Next(0, quantity.Length)],
           //         Name = ingredients[new Random().Next(0, ingredients.Length)],
           //     });
           // }
           // modelBuilder.Entity<Ingredient>().HasData(lingredient);
            for (int i = 1; i < 5; i++)
            {
                images.Add(new RecipeImage()
                {
                    Id = i,
                    Url = urls[new Random().Next(0, urls.Length)],
                    Name = title[new Random().Next(0, title.Length)],
                });
            }

           // modelBuilder.Entity<RecipeImage>().HasData(images);

            IList<Recipe> recipes = new List<Recipe>();

            for (int i = 1; i < 15000; i++)
            {
                recipes.Add(new Recipe()
                {
                    Id = i,
                    Title = title[new Random().Next(0, title.Length)],
                    level = level[new Random().Next(0, level.Length)],
                    CreatedDate = DateTime.Today.AddDays(-(new Random().Next(1, 100))),
                   // Steps = GetSteps(),
                    Ingredients = GetIngredients(),
                    
                   // Images = images,
                });
            }

            modelBuilder.Entity<Recipe>().HasData(recipes);
        }
        private  static List<Ingredient> GetIngredients()
        {
            var quantity = new[] { "200gm", "100gm", "2 Spoon", "1kg", "2kg", "1 cup", "5 count" };
            var ingredients = new[] { "500g strong white bread flour", "plus extra for dusting", "1 tsp salt", "50g caster sugar", "7g sachet dried yeast", "300ml semi-skimmed milk", "40g unsalted butter, cubed", "1 large egg", "lightly beaten", "vegetable oil", "for greasing" };

            List<Ingredient> lingredient = new List<Ingredient>();
            for (int i = 1; i < 5; i++)
            {
                lingredient.Add(new Ingredient()
                {
                    Id = i,
                    Quantity = quantity[new Random().Next(0, quantity.Length)],
                    Name = ingredients[new Random().Next(0, ingredients.Length)],
                });
            }
            return lingredient;
        }
        private static List<Step> GetSteps()
        {
            List<Step> lsteps = new List<Step>();

            var steps = new[] { "Mix the flour", "Knead the dough", "Bake the buns", "Ice the buns", "Sprinkle", "Lenova", "MSI", "Toshiba", "Samsung", "Microsoft", "Apple", "Razer", "Iball", "Iball", "huawei" };


            for (int i = 1; i < 5; i++)
            {
                lsteps.Add(new Step()
                {
                    Id = i,
                    Name = steps[new Random().Next(0, steps.Length)],
                });
            }
            return lsteps;
        }
    }
}
