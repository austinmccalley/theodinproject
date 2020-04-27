class LessonCompletionDataSerializer
  def initialize(course, start_date, end_date)
    @course = course
    @lesson_completion_data = LessonCompletionData.new(@course, start_date, end_date)
  end

  def as_json
    {@course.title => lessons_data_hash}
  end

  def self.as_json(course, start_date, end_date = Time.now)
    new(course, start_date, end_date).as_json
  end

  private

  def lessons_data_hash
    lessons = @lesson_completion_data.lessons_with_known_completion_durations
    lessons.reduce({}) do |hash, lesson|
      hash[lesson.title] = lesson_data_hash(lesson)
      hash
    end
  end

  def lesson_data_hash(lesson)
    {
      'duration' => @lesson_completion_data.lesson_duration(lesson),
    }
  end
end
