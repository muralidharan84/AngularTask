using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineFoodStore.Model;
using OnlineFoodStore.Repository;
using OnlineFoodStore.Utils;

namespace OnlineFoodStore.Controllers
{
  
    [Route("api/recipe")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeRepository<Recipe> _recipeRepository;
      
        public RecipeController(IRecipeRepository<Recipe> recipeRepository)
        {
            _recipeRepository = recipeRepository;
        }


        [HttpGet("GetFilteredRecipes")]
        public IActionResult Get(string level = "",string date = "")
        {
            IEnumerable<Recipe> response = _recipeRepository.GetFilteredData(level, date);
            return Ok(response);
        }


        [HttpGet("GetAllRecipes")]
        public IActionResult Get(int pageNo = 1, int pageSize = 9) 
        {
            PaginatedList<Recipe> paginatedRecipe = PaginatedList<Recipe>.Create(_recipeRepository.GetAll(), pageNo, pageSize);

            return Ok(paginatedRecipe);
        }


        [HttpGet("getRecipeCount")]
        public IActionResult Get()
        {
            long count = _recipeRepository.GetRecipesCount();

            return Ok(count);
        }


        [HttpGet("AddRecipe")]
        public IActionResult Post(Recipe recipe)
        {
            _recipeRepository.Add(recipe);
            return Ok();
        }

        [HttpGet("UpdateRecipe")]
        public IActionResult Put( Recipe recipe)
        {
            _recipeRepository.Update(recipe);
            return Ok();
        }
    }




}
