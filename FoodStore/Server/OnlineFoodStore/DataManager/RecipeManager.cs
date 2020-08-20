using OnlineFoodStore.Model;
using OnlineFoodStore.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFoodStore.DataManager
{
    public class RecipeManager : IRecipeRepository<Recipe>
    {
        readonly FoodStoreDbContext _foodStoreContext;

        public RecipeManager(FoodStoreDbContext context)
        {
            _foodStoreContext = context;
        }

        public IEnumerable<Recipe> GetAll()
        {
            return _foodStoreContext.Recipes.ToList();
        }

        public long GetRecipesCount()
        {
            return _foodStoreContext.Recipes.Count();
        }

        public Recipe Get(long id)
        {
            return _foodStoreContext.Recipes.FirstOrDefault(e => e.Id == id);
        }
       
        public IEnumerable<Recipe> GetFilteredData(string level = "", string date = "")
        {
            IEnumerable<Recipe> recipes = null;

            if (!(string.IsNullOrEmpty(level) && !string.IsNullOrEmpty(date)))
            {
                DateTime oDate = DateTime.Parse(date);
                recipes = _foodStoreContext.Recipes.Where(x => x.level.ToLower() == level.ToLower() && x.CreatedDate == oDate).ToList();
            }
            else if (!string.IsNullOrEmpty(level))
            {
                recipes = _foodStoreContext.Recipes.Where(x => x.level.ToLower() == level.ToLower()).ToList();
            }
            else if (!string.IsNullOrEmpty(date))
            {
                DateTime oDate = DateTime.Parse(date);
                recipes = _foodStoreContext.Recipes.Where(x => x.CreatedDate == oDate).ToList();
            }
            else
            {
                recipes = _foodStoreContext.Recipes.ToList();
            }
            return recipes;
        }

        #region

        public long Add(Recipe t)
        {
            _foodStoreContext.Add(t);
            _foodStoreContext.SaveChanges();
            return t.Id;
        }

        public void Update(Recipe t)
        {
            _foodStoreContext.Attach(t);
            _foodStoreContext.Entry(t).Property("Title").IsModified = true;
            _foodStoreContext.Entry(t).Property("Ingredients").IsModified = true;
            _foodStoreContext.Entry(t).Property("Steps").IsModified = true;
            _foodStoreContext.Entry(t).Property("Images").IsModified = true;
            _foodStoreContext.Entry(t).Property("level").IsModified = true;
            _foodStoreContext.SaveChanges();
        }
        #endregion


    }
}
