class LessonDuration

  def initialize(lesson, lesson_completions)
    @lesson = lesson
    @lesson_completions = lesson_completions
  end

  def duration
    ActiveSupport::Duration.build(average_duration.to_i).inspect
  end

  def title
    lesson.title
  end

  private

  attr_reader :lesson, :lesson_completions

  def average_duration
    durations.reduce(0) { |sum, duration| sum + duration } / durations.size
  rescue ZeroDivisionError
    0
  end

  def durations
    lesson_completions
      .where(lesson_id: [lesson, next_lesson])
      .group('lesson_completions.student_id')
      .having("count(lesson_completions) = 2")
      .pluck(Arel.sql("max(extract(epoch from created_at)) - min(extract(epoch from created_at))"))
  end

  def next_lesson
    FindLesson.new(lesson, lesson.course).next_lesson
  end
end
