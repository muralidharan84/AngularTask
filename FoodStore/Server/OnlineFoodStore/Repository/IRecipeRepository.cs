using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFoodStore.Repository
{
    public interface IRecipeRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();
        long GetRecipesCount();
        IEnumerable<TEntity> GetFilteredData(string level , string date); //SearchData searchData
        TEntity Get(long id);

        long Add(TEntity t);

        void Update(TEntity t);

    }

   
}
