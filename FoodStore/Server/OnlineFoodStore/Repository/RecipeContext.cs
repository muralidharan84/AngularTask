using Microsoft.EntityFrameworkCore;
using OnlineFoodStore.Model;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFoodStore.Repository
{
    public class FoodStoreDbContext : DbContext
    {
        public FoodStoreDbContext(DbContextOptions options)
           : base(options)
        {
        }

        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Step> Steps { get; set; }
        public DbSet<RecipeImage> RecipeImage { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //// Define composite key.
            //modelBuilder.Entity<Ingredient>()
            //    .HasKey(lc =>  new { lc.RecipeId });

            modelBuilder.Seed();
        }
    }



}
