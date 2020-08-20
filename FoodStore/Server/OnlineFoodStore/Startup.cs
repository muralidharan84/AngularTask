using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OnlineFoodStore.Repository;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks.Dataflow;
using OnlineFoodStore.Model;
using OnlineFoodStore.DataManager;

namespace OnlineFoodStore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(options =>
            {
                // Cross Orgin just allowing only the localhost with all the Header and Methods(Get,Post,Put, delete etc)
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
            });


            //services.AddDbContext<FoodStoreDbContext>(opts => opts.UseSqlServer(Configuration["ConnectionString:FoodStoreDB"]);
            //          opts.EnableSensitiveDataLogging(true)
            //    );

            services.AddDbContext<FoodStoreDbContext>(options => {
                options.UseSqlServer(Configuration["ConnectionString:FoodStoreDB"]);
                options.EnableSensitiveDataLogging(true);
            });


            services.AddScoped<IRecipeRepository<Recipe>, RecipeManager>();
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, FoodStoreDbContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            context.Database.EnsureCreated();

            app.UseHttpsRedirection();

            app.UseRouting();
            //To Enable Cors
            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
