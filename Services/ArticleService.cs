using boxon_project.DataAccess;
using boxon_project.Interfaces;
using boxon_project.Models;

namespace boxon_project.Services
{
    public class ArticleService : IArticelService
    {
        public async Task<ResponseModel> AddArticle(List<ArticleModel> model)
        {
            ResponseModel responseModel = new ResponseModel();

            if (model != null && model.Count > 0)
            {
                try
                {
                    using (var context = new DBContext())
                    {

                        await context.Article.AddRangeAsync(model);
                        context.SaveChanges();
                    }
                    responseModel.Status = StatusCodes.Status200OK;
                    responseModel.message = "Data Store SuccessFully";
                }
                catch (Exception ex)
                {
                    responseModel.Status = StatusCodes.Status500InternalServerError;
                    responseModel.message = ex.Message.ToString();
                }
            }
            else
            {
                responseModel.Status = StatusCodes.Status204NoContent;
                responseModel.message = "Model Error";
            }
            return responseModel;
        }
    }
}
