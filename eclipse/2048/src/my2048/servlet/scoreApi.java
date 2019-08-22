package my2048.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*@WebServlet("/scoreApi/*")*/
public class scoreApi extends HttpServlet {
	  /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String highscore = "100";
	
	  /**
	   * @see HttpServlet#HttpServlet()
	   */
	  public scoreApi() {
	    super();
	    // TODO Auto-generated constructor stub
	  }
	
	  /**
	   * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	   *      response)
	   */
	  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    request.setCharacterEncoding("UTF-8");
	    try {
	      PrintWriter out = response.getWriter();
	      out.write(highscore);
		  System.out.println(highscore);
	      out.flush();
	      out.close();
	    } catch (Exception e) {
	      // TODO Auto-generated catch block
	      e.printStackTrace();
	      System.out.println(e);
	    }
	  }
	  
	  /**
	   * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	   *      response)
	   */
	  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    response.setContentType("application/plain");
	    response.setCharacterEncoding("UTF-8");
	    request.setCharacterEncoding("UTF-8");
	    PrintWriter out;
	    
	      try {
	        out = response.getWriter();
	        out.write(highscore);
	        System.out.println(highscore);
	        out.flush();
	        out.close();
	      } catch (Exception e) {
	        // TODO Auto-generated catch block
	    	  e.printStackTrace();
	    	  System.out.println(e);
	      }
	   }
}
